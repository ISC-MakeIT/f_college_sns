import { ProductType } from './entities';

interface VoteIdsType { 'fashion': number[]; 'beauty': number[]; }

export class ApplicationManager {

    public static get instance(): ApplicationManager {

        if (this.DEBUG || !this._instance) {
            const voteIds = this.getVoteIds();
            const remainedVoteCount = this.getRemainedVoteCount();
            this._instance = new ApplicationManager(voteIds, remainedVoteCount);
        }

        return this._instance;
    }

    public static BEAUTY_VOTE_COUNT = 3;
    public static FASHION_VOTE_COUNT = 3;
    // TODO
    public static DEBUG = true;

    // Storage keyを定数に
    public static KEY_PREFIX = 'DEBUG';
    private static KEY_VOTE_IDS = `${ApplicationManager.KEY_PREFIX}_voteIds`;
    private static KEY_REMAINED_VOTE_COUNT = `${ApplicationManager.KEY_PREFIX}_remainedVoteCount`;

    // tslint:disable-next-line:variable-name
    private static _instance: ApplicationManager;

    private static getVoteIds = () => {
        const voteIds: any = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS);

        if (ApplicationManager.DEBUG && !voteIds) {
            const initialVoteIds = { fashion: [], beauty: [] };
            localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(initialVoteIds));
            return initialVoteIds;
        }

        return JSON.parse(voteIds);
    }

    private static getRemainedVoteCount = () => {
        let remainedVoteCount: any = localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);

        if (ApplicationManager.DEBUG && !remainedVoteCount) {
            remainedVoteCount = {};
            remainedVoteCount.fashion = ApplicationManager.FASHION_VOTE_COUNT;
            remainedVoteCount.beauty = ApplicationManager.BEAUTY_VOTE_COUNT;
            localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(remainedVoteCount));
            return remainedVoteCount;
        }

        return JSON.parse(remainedVoteCount);
    }

    public voteIds: VoteIdsType;
    public remainedVoteCount: { fashion: number, beauty: number };

    private constructor(voteIds: VoteIdsType, remainedVoteCount: { fashion: number, beauty: number }) {
        this.voteIds = voteIds;
        this.remainedVoteCount = remainedVoteCount;
    }

    public pushVoteIds = async (id: number, key: ProductType) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"{}"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);

        if (parsedTmpStorageIds[key.toLowerCase()].includes(id)) return;

        parsedTmpStorageIds[key.toLowerCase()].push(id);
        this.voteIds = parsedTmpStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(this.voteIds));
        await this.decrementRemainedVoteCount(key);
    }

    public popVoteIds = async (id: number, key: ProductType) => {
        const tmpStorageIds = localStorage.getItem(ApplicationManager.KEY_VOTE_IDS) || '"{}"';
        const parsedTmpStorageIds = JSON.parse(tmpStorageIds);
        parsedTmpStorageIds[key.toLowerCase()] = parsedTmpStorageIds[key.toLowerCase()].filter((e: number) => e !== id);
        this.voteIds = parsedTmpStorageIds;
        localStorage.setItem(ApplicationManager.KEY_VOTE_IDS, JSON.stringify(this.voteIds));
        await this.incrementRemainedVoteCount(key);
    }

    public async incrementRemainedVoteCount(key: ProductType) {
        const tmpRemainedVoteCount = await localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);
        if (!tmpRemainedVoteCount) return;

        const parsedStorageVoteCount = JSON.parse(tmpRemainedVoteCount);
        parsedStorageVoteCount[key.toLowerCase()] += 1;
        this.remainedVoteCount = parsedStorageVoteCount;
        await localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(this.remainedVoteCount));
    }

    public async decrementRemainedVoteCount(key: ProductType) {
        const tmpRemainedVoteCount = localStorage.getItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT);
        if (!tmpRemainedVoteCount) return;

        const parsedStorageVoteCount = JSON.parse(tmpRemainedVoteCount);
        parsedStorageVoteCount[key.toLowerCase()] -= 1;
        this.remainedVoteCount = parsedStorageVoteCount;
        await localStorage.setItem(ApplicationManager.KEY_REMAINED_VOTE_COUNT, JSON.stringify(this.remainedVoteCount));
    }
}
