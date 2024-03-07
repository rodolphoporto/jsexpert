InjectHttpInterceptor()

import http from 'http';
import { InjectHttpInterceptor } from './../index.js'

// curl -i localhost:3000
function handleResquest(request, response) {
//   response.setHeader('X-Instrumented-By', 'rodolphoporto');
  response.end('Hello World\n');
}

const server = http.createServer(handleResquest);
const port = 3000
server.listen(port, () => console.log('server running at', server.address().port));