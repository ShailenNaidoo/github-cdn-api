import axios from 'axios';
import frontmatter from 'front-matter';

interface Args {
  owner: string | null;
  repository: string | null;
  branch: string | null;
}

class GitHubCDN {
  readonly owner: null | string = null;
  readonly repository: null | string = null;
  readonly branch: null | string = null;

  constructor({ owner, repository, branch }: Args) {
    this.owner = owner;
    this.repository = repository;
    this.branch = branch;
  }

  async getFileJSON(filePath: string, token: string) {
    return axios.post('https://api.github.com/graphql', {
      query: `
        query ($owner: String!, $repo: String!, $file: String!) { 
          repository(owner: $owner, name: $repo) {
            object(expression: $file) {
              ...on Blob {
                text
              }
            }
          }
        }
      `,
      variables: {
        owner: this.owner,
        repo: this.repository,
        file: `master:${filePath}`
      }
    }, {
      headers: {
        Authorization: token,
      }
    }).then(res => frontmatter(res.data.data.repository.object.text));
  }
}

export {
  GitHubCDN,
};