export class Post  {
  constructor(userName: string, date: Date, text: string){
    this.userName = userName;
    this.text = text;
    this.date = date
  }
  public readonly userName?: String;
  public readonly date?: Date;
  public readonly text?: String;
};
