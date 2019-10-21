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

  async getFileRaw(filePath: string) {
    return axios.get(`https://raw.githubusercontent.com/${this.owner}/${this.repository}/${this.branch}/${filePath}`).then(res => res.data);
  }

  async getFileJSON(filePath: string) {
     return frontmatter(await this.getFileRaw(filePath));
  }
}

export {
  GitHubCDN,
};