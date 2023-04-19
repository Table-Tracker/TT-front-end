export interface EmailDTO {
    from: string,
    to: string[],
    bcc: string[],
    cc: string[],
    subject: string,
    body: string,
}
