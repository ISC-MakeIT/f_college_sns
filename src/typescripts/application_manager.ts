import { ProductType } from './entities';

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
        const voteIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS);

        if (!voteIds) {
            const initialVoteIds = { fashion: [], beauty: [] };
            localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(initialVoteIds));
            return initialVoteIds;
        }

        return JSON.parse(voteIds);
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

    public voteIds: {};
    public uuid: string;
    public remainedVoteCount: {};

    private constructor(voteIds: {}, uuid: string, remainedVoteCount: {}) {
        this.voteIds = voteIds;
        this.uuid = uuid;
        this.remainedVoteCount = remainedVoteCount;
    }

    public setUuid = (uuid: string) => {
        this.uuid = uuid;
        localStorage.setItem(ApplicationManager.KEY_UUID, uuid);
    }

    public pushVoteIds = (key: ProductType, id: number) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"{}"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);

        if (parsedTmpStorageIds[key].includes(id)) return;

        parsedTmpStorageIds[key].push(id);
        this.voteIds = parsedTmpStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(this.voteIds));
    }

    public popVoteIds = (key: ProductType, id: number) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"{}"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);
        parsedTmpStorageIds[key] = parsedTmpStorageIds[key].filter((e: number) => e !== id);
        this.voteIds = parsedTmpStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(this.voteIds));
    }

    public incrementRemainedVoteCount = (key: ProductType) => {
        const tmpRemainedVoteCount = localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);
        if (!tmpRemainedVoteCount) return;

        const parsedStorageVoteCount = JSON.parse(tmpRemainedVoteCount);
        const keyName = ['BEAUTY_VOTE_COUNT', 'FASHION_VOTE_COUNT'].find(n => n.includes(key.toUpperCase()));

        // FIXME ↓みたいにしたいけどコンパイラに怒られた if ( keyName && parsedStorageVoteCount[key] >=
        // ApplicationManager[keyName]) return;
        if (keyName === 'BEAUTY_VOTE_COUNT') {
            if (parsedStorageVoteCount[key] >= ApplicationManager.BEAUTY_VOTE_COUNT) return;
        } else {
            if (parsedStorageVoteCount[key] >= ApplicationManager.FASHION_VOTE_COUNT) return;
        }

        parsedStorageVoteCount[key] += 1;
        this.remainedVoteCount = parsedStorageVoteCount;
        localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(this.remainedVoteCount));
    }

    public decrementRemainedVoteCount = (key: ProductType) => {
        const tmpRemainedVoteCount = localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);
        if (!tmpRemainedVoteCount) return;

        const parsedStorageVoteCount = JSON.parse(tmpRemainedVoteCount);

        if (parsedStorageVoteCount[key] <= 0) return;

        parsedStorageVoteCount[key] -= 1;
        this.remainedVoteCount = parsedStorageVoteCount;
        localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(this.remainedVoteCount));
    }
}
