import express, { json } from 'express';
import { GitHubCDN } from './github-wrapper'

const app = express();

app.use(json());

app.post('/api', async (req, res) => {
  const {
    owner,
    repository,
    branch,
    filepath,
  } = req.body;

  if (!([owner, repository, branch, filepath].every((val) => !!val))) {
    res.status(400).json({
      code: 400, 
      message: 'Sorry, you need to provide us with all fields in order for us to proccess your request',
    });

    return;
  }

  const githubFiles = new GitHubCDN({
    owner,
    repository,
    branch,
  });

  const { attributes, body, frontmatter } = await githubFiles.getFileJSON(filepath, req.headers.authorization as string);

  res.json({
    data: attributes,
    content: body,
    frontmatter,
  });
});

app.listen(8080);