export interface Messages {
    id: number;
    senderId: number;
    senderPhotoUrl: string;
    senderKnownAs: string;
    recipaintId: number;
    recipaintPhotoUrl: string;
    recipaintKnownAs: string;
    content: string;
    isRead: boolean;
    dateRead: Date;
    messageSent: Date;
}
