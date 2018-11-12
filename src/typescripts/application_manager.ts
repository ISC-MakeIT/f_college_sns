export class ApplicationManager {
    private static BEAUTY_VOTE_COUNT = 5;
    private static FASHION_VOTE_COUNT = 8;

    public static get instance(): ApplicationManager {
        if (!this._instance) {
            const voteIds = this.getVoteIds();
            const uuid = this.getUuid();
            const remainedVoteCount = this.getRemainedVoteCount();
            this._instance = new ApplicationManager(voteIds, uuid, remainedVoteCount);
        }

        return this._instance;
    }

    // tslint:disable-next-line:variable-name
    private static _instance: ApplicationManager;

    private static getVoteIds = () => {
        const strIds = localStorage.getItem('voteIds');

        if (!strIds) return [];

        return strIds.split(',').map(n => Number(n));
    }

    private static getUuid = () => {
        const uuid = localStorage.getItem('uuid');

        if (!uuid) return '';

        return uuid;
    }

    private static getRemainedVoteCount = () => {
        let remainedVoteCount: any = localStorage.getItem('remainedVoteCount');

        if (!remainedVoteCount) {
            remainedVoteCount = {};
            remainedVoteCount.fashion = ApplicationManager.FASHION_VOTE_COUNT;
            remainedVoteCount.beauty = ApplicationManager.BEAUTY_VOTE_COUNT;
            localStorage.setItem('remainedVoteCount', JSON.stringify(remainedVoteCount));
            return remainedVoteCount;
        }

        return JSON.parse(remainedVoteCount);
    }

    public voteIds: any[];
    public uuid: string;
    public remainedVoteCount: {};

    private constructor(voteIds: any[], uuid: string, remainedVoteCount: {}) {
        this.voteIds　= voteIds;
        this.uuid = uuid;
        this.remainedVoteCount = remainedVoteCount;
    }
}
