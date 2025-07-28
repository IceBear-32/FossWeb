import { github_org_link } from "~/assets/js/socials"

export default defineEventHandler(async (event) => {
    let repos: any;
    await $fetch(`https://api.github.com/users/${github_org_link.split('/').pop()}/repos`, {
        onResponse(res) {
            repos = res.response._data
        },
        onResponseError() { }
    })

    if (repos?.status) {
        setResponseStatus(event, Number(repos.status))
        return { error: 'api.github: ' + repos.message }
    }
    let projects: any = []
    
    for (const repo of repos) {
        try {
            const data: any = await $fetch(`https://raw.githubusercontent.com/${github_org_link.split('/').pop()}/${repo.name}/refs/heads/${repo.default_branch}/project_info.json`);
            projects.push({
                project_name: repo.name,
                roject_description: 'update project_info.description',
                project_tech_stack: ['update project_info.tech_stack'],
                project_author: 'update project_info.author',
                project_author_url: '#',
                project_url: repo.html_url,
                ...JSON.parse(data)
            });
        } catch (e) {
            projects.push({
                project_name: repo.name,
                project_description: 'update project_info.description',
                project_tech_stack: ['update project_info.tech_stack'],
                project_author: 'update project_info.author',
                project_author_url: '#',
                project_url: repo.html_url,
            });
        }
    }

    return { projects }
})