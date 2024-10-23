import create_deployment_action from "@/lib/actions/create_deployment_action";
import { getProjectByName } from "@/lib/prisma/project/service";
import crypto from "crypto";

import { NextResponse } from "next/server";

type Project = {
    id: string;
    name: string;
    domain: string;
    repo_url: string;
    build_command: string;
    output_dir: string;
    created_at: Date;
    user_id: string;
}

export const POST = async (req: Request) => {
    try {
        const signature = req.headers.get('X-Hub-Signature-256');
        const event = req.headers.get('x-github-event');

        if (event !== 'push') {
            return NextResponse.json({ message: `Event: ${event} is not valid` }, { status: 403 });
        }

        const rawBody = await req.text();

        // passord should be hard coded change it 
        const hash = "sha256=" + crypto.createHmac('sha256', process.env.TOKEN_ENCRYPT_KEY as string).update(rawBody).digest('hex');

        if (hash !== signature) {
            return NextResponse.json({ error: "signature is not valid" }, { status: 500 });
        }

        const data = JSON.parse(rawBody) as { repository: { name: string } };

        const repo_name = data.repository.name;

        const project = await getProjectByName(repo_name);

        const result = await create_deployment_action({
            project: project as Project,
            repo_url: project?.repo_url as string,
            build_command: project?.build_command,
            output_dir: project?.output_dir
        })

        return NextResponse.json({ message: "valid signature" }, { status: 200 });

    } catch (error: any) {
        return NextResponse.json({ error: error?.message }, { status: 500 });

    }


}