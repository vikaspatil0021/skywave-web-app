import { decryptToken } from "../encrypt_token";

type Create_Webhook_Action = {
    project_name: string,
    repo_url: string,
    token: {
        encrypted_access_token: string,
        token_iv: string
    }
}

export default async function create_webhook_action({ project_name, repo_url, token: { encrypted_access_token, token_iv } }: Create_Webhook_Action) {
    const q = repo_url.replace("https://github.com/", '').replace('.git', '')
    const url = `https://api.github.com/repos/${q}/hooks`;

    const token = await decryptToken(encrypted_access_token, token_iv)

    const result = await fetch(url, {
        method: 'POST',
        headers: {
            "Authorization": `bearer ${token}`
        },
        body: JSON.stringify({
            "name": 'web',
            "active": true,
            "events": [
                "push"
            ],
            "config": {
                "url": `${process.env.NEXTAUTH_URL}/api/webhooks`,
                "content_type": "json",
                "secret": process.env.TOKEN_ENCRYPT_KEY,
                "insecure_ssl": 0
            }
        })
    });

    return await result?.json();

}