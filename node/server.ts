import * as http from 'http';
import * as fs from 'fs';

// https://medium.com/free-code-camp/how-to-set-up-a-typescript-project-67b427114884

type Request = http.IncomingMessage;
type Response = http.ServerResponse<http.IncomingMessage>;
type HandleFunction = (request: Request, response: Response) => void;

export class Server {

    private port: number;
    private path: string;
    private mimeTypes: Map<string | undefined, string> = new Map<string | undefined, string>()
        .set('.ts', 'text/javascript')
        .set('.js', 'text/javascript')
        .set('.js.map', 'application/json')
        .set('.json', 'application/json')
        .set('.html', 'text/html')
        .set('.css', 'text/css')
        .set('.ico', 'image/x-icon')
        .set('.png', 'image/png')
        .set('.jpg', 'image/jpg')
        .set('.svg', 'image/svg+xml')
        .set('.pdf', 'application/pdf')
        .set('.ttf', 'application/font-sfnt')

    constructor(port: number, path: string) {
        this.port = port;
        this.path = path;
    }

    public Start() {
        http.createServer(this.handleRequest.bind(this))
            .listen(this.port);
    }

    private handleRequest(request: Request, response: Response) {
        if (!request.url)
            return;
        this.getHandleFunction(request.url)
            ?.apply(this, [request, response]);
    }

    private getFileExtension(url: string): string | undefined {
        let file = url.split('/').pop()
        let indexDot = file?.lastIndexOf('.') || -1;
        return indexDot >= 0
            ? file!.substring(indexDot)
            : undefined;
    }

    private getHandleFunction(url: string) : HandleFunction | undefined {
        let extension: string | undefined = this.getFileExtension(url);
        let mimeType: string | undefined = this.mimeTypes.get(extension)
        return !!mimeType
            ? this.handleFile(mimeType)
            : undefined;
    }

    private handleFile(contentType: string): HandleFunction {
        return (request: Request, response: Response) => {
            response.writeHead(200, {'Content-Type': contentType});
            var path = this.path + request.url;
            fs.existsSync(path) && fs.createReadStream(path).pipe(response);
        }
    }
} // End of Server