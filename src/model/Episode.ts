export default class Episode {
    name: string;
    episode:number;
    posted:string;
    server:string[];

    constructor(name: string, episode:number, posted:string, server:string[]) {
        this.name = name;
        this.episode = episode;
        this.posted = posted;
        this.server = server;
    }
    get():string{
        return this.toString();
    }
    
}

