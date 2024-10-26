import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

import { isValid_ProjectName } from "@/lib/utils"
import useMediaQuery from "@/lib/use_media_query"

import { trpc } from "@/server/trpcClient"

import { toast } from "../use-toast"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Label } from "../label"
import { Switch } from "../switch"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { GitHubLogoIcon } from "@radix-ui/react-icons"



type NewProjectDeployDrawerDialogProps = {
    repo: {
        id: number,
        name: string,
        updated_at: string,
        visibility: string,
        git_url: string,
        clone_url: string
    },
    git_username: string
}

export function NewProjectDeployDrawerDialog({ repo, git_username }: NewProjectDeployDrawerDialogProps) {
    const [open, setOpen] = useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="default" size='sm' className="h-7">Import</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] dark:bg-[#333]">
                    <DialogHeader>
                        <DialogTitle>Configure Project</DialogTitle>
                    </DialogHeader>

                    <ProfileForm git_username={git_username} repo={repo} />

                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="default" size='sm' className="h-7">Import</Button>
            </DrawerTrigger>
            <DrawerContent className="dark:bg-[#333]">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Configure Project</DrawerTitle>
                </DrawerHeader>

                <div className="px-4 gap-4 grid">
                    <ProfileForm git_username={git_username} repo={repo} />
                </div>

                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="secondary">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

function ProfileForm({ repo, git_username }: NewProjectDeployDrawerDialogProps) {
    const router = useRouter();

    const [build_command_disabled, set_build_command_disabled] = useState<boolean>(true);
    const [output_directory_disabled, set_output_directory] = useState<boolean>(true);

    const [project_name, set_project_name] = useState<string>(repo?.name || '');
    const [build_command, set_build_command] = useState<string>('');
    const [output_dir, set_output_dir] = useState<string>('');

    const create_project_mutation = trpc?.project?.create_project?.useMutation();

    const { data, error: cp_error, isSuccess: cp_isSuccess, isPending: cp_isPending } = create_project_mutation;

    useEffect(() => {

        if (cp_error) {
            toast({
                title: cp_error?.message,
                variant: "destructive"
            })
        }

        if (cp_isSuccess) {
            router.push(`/dashboard/${data?.project?.name}/${data?.deployment?.id}`)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cp_error, cp_isSuccess])

    const create_project_handler = (e: any) => {
        e.preventDefault();

        if (!isValid_ProjectName(project_name)) {
            toast({ variant: "destructive", title: "Project names can be up to 100 characters long and must be lowercase. They can include letters, digits, and the following characters: '_', '-'" })
            return;
        }

        const config = {
            project_name,
            repo_id: repo?.id,
            repo_url: repo?.clone_url
        } as {
            project_name: string;
            repo_id: number;
            repo_url: string;
            build_command?: string;
            output_dir?: string;
        }

        if (build_command && build_command !== '') {
            config.build_command = build_command;
        }

        if (output_dir && output_dir !== '') {
            config.output_dir = output_dir;
        }

        create_project_mutation.mutate(config)
    }

    return (
        <>
            <div className='flex justify-between items-center py-3 px-3 border border-white/20 text-xs dark:bg-[#111] bg-[#ccc] rounded-md'>
                <div className="flex items-center gap-2 cursor-default">
                    <GitHubLogoIcon />
                    <span className="leading-none max-w-[300px] truncate" title={`${git_username}/${repo?.name}`}>{`${git_username}/${repo?.name}`}</span>
                </div>
            </div >
            <form className="grid items-start gap-4">
                <div className="grid gap-1">
                    <Label htmlFor="project_name" className="text-xs font-medium dark:text-white/50 tracking-wide">
                        Project Name <span className="dark:text-white/60">{"( 'a-z', '0-9', '-', '_' only)"}</span>
                    </Label>
                    <Input type="text" id="project_name" className="dark:bg-[#111] bg-[#ccc]" value={project_name} onChange={(e: any) => set_project_name(e.target?.value)} />
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="build_command" className="text-xs dark:text-white/50">Build Command</Label>
                    <div className="flex items-center gap-2">
                        <Input id="build_command" placeholder="npm run build" className="dark:bg-[#111] bg-[#ccc]" disabled={build_command_disabled} value={build_command} onChange={(e: any) => set_build_command(e.target?.value)} />
                        <Switch id="build_command_override" title="Override" checked={!build_command_disabled} onCheckedChange={(val: boolean) => set_build_command_disabled(!val)} />
                    </div>
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="output_directory" className="text-xs dark:text-white/50">Output Directory</Label>
                    <div className="flex items-center gap-2">
                        <Input id="output_directory" placeholder="build" className="dark:bg-[#111] bg-[#ccc]" disabled={output_directory_disabled} value={output_dir} onChange={(e: any) => set_output_dir(e.target?.value)} />
                        <Switch id="output_directory_override" title="Override" checked={!output_directory_disabled} onCheckedChange={(val: boolean) => set_output_directory(!val)} />
                    </div>
                </div>

                <Button variant='default' onClick={create_project_handler} loading={cp_isPending}>deploy</Button>
            </form>
        </>
    )
}
