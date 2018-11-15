export class User {
    public constructor(
        public studentId: number,
        public studentName: string,
        public studentClass: string,
        public profilePhoto: string,
        public leaderFlg: boolean | null,
    ) {}
}
