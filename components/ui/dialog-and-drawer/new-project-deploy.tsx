import { useState } from "react"

import { isValidString } from "@/lib/utils"
import useMediaQuery from "@/lib/use_media_query"
import { Button } from "@/components/ui/button"
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
import { Input } from "@/components/ui/input"
import { Label } from "../label"
import { GitHubLogoIcon } from "@radix-ui/react-icons"
import { Switch } from "../switch"
import { trpc } from "@/server/trpcClient"

type NewProjectDeployDrawerDialogProps = {
    repo: {
        id: string,
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
                <DialogContent className="sm:max-w-[425px] bg-[#333]">
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
            <DrawerContent className="bg-[#333]">
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
    const [build_command_disabled, set_build_command_disabled] = useState<boolean>(true);
    const [output_directory_disabled, set_output_directory] = useState<boolean>(true);

    const [project_name, set_project_name] = useState<string>(repo?.name || '');

    const create_project_mutation = trpc?.project?.create_project?.useMutation();

    const create_project_handler = (e: any) => {
        e.preventDefault();
        console.log(project_name)
        create_project_mutation.mutate({ project_name, repo_url: repo?.clone_url })
    }

    return (
        <>
            <div className='flex justify-between items-center py-3 px-3 border border-white/20 text-xs bg-[#111] rounded-md'>
                <div className="flex items-center gap-2 cursor-default">
                    <GitHubLogoIcon />
                    <span className="leading-none max-w-[300px] truncate" title={`${git_username}/${repo?.name}`}>{`${git_username}/${repo?.name}`}</span>
                </div>
            </div >
            <form className="grid items-start gap-4">
                <div className="grid gap-1">
                    <Label htmlFor="project_name" className="text-xs text-white/50">Project Name</Label>
                    <Input type="text" id="project_name" className="bg-[#111]" value={project_name} onChange={(e: any) => set_project_name(e.target?.value)} />
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="build_command" className="text-xs text-white/50">Build Command</Label>
                    <div className="flex items-center gap-2">
                        <Input id="build_command" placeholder="npm run build" className="bg-[#111]" disabled={build_command_disabled} />
                        <Switch id="build_command_override" title="Override" checked={!build_command_disabled} onCheckedChange={(val: boolean) => set_build_command_disabled(!val)} />
                    </div>
                </div>
                <div className="grid gap-1">
                    <Label htmlFor="output_directory" className="text-xs text-white/50">Output Directory</Label>
                    <div className="flex items-center gap-2">
                        <Input id="output_directory" placeholder="build" className="bg-[#111]" disabled={output_directory_disabled} />
                        <Switch id="output_directory_override" title="Override" checked={!output_directory_disabled} onCheckedChange={(val: boolean) => set_output_directory(!val)} />
                    </div>
                </div>

                <Button variant='default' onClick={create_project_handler}>deploy</Button>
            </form>
        </>
    )
}
