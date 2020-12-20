export class Task {
  constructor(
    public _id: string,
    public title: string,
    public body: string,
    public check: boolean
  ) {}
}
