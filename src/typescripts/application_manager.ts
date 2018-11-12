export class ApplicationManager {
    private static BEAUTY_VOTE_COUNT = 5;
    private static FASHION_VOTE_COUNT = 8;

    // Storage keyを定数に
    private static KEY_VOTE_IDS = 'voteIds';
    private static KEY_UUID = 'uuid';
    private static KEY_REMAINED_VOTE_COUNT = 'remainedVoteCount';

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
        const strIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS);

        if (!strIds) {
            localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify([]));
            return [];
        }

        return JSON.parse(strIds);
    }

    private static getUuid = () => {
        const uuid = localStorage.getItem(ApplicationManager.KEY_UUID);

        if (!uuid) return '';

        return uuid;
    }

    private static getRemainedVoteCount = () => {
        let remainedVoteCount: any = localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);

        if (!remainedVoteCount) {
            remainedVoteCount = {};
            remainedVoteCount.fashion = ApplicationManager.FASHION_VOTE_COUNT;
            remainedVoteCount.beauty = ApplicationManager.BEAUTY_VOTE_COUNT;
            localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(remainedVoteCount));
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

    public setUuid = (uuid: string) => {
        this.uuid = uuid;
        localStorage.setItem(ApplicationManager.KEY_UUID, uuid);
    }

    public pushVoteIds = (id: number) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"[]"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);

        if (parsedTmpStorageIds.includes(id)) return;

        parsedTmpStorageIds.push(id);
        this.voteIds = parsedTmpStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(parsedTmpStorageIds));
    }

    public popVoteIds = (id: number) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"[]"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);
        const filteredStorageIds = parsedTmpStorageIds.filter((e: number) => e !== id);
        this.voteIds = filteredStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(filteredStorageIds));
    }
}
