interface IVersion {
    name: string,
    code: string
}

export interface ITechnologies {
    type: string;
    selected: boolean,
    icon: string,
    title: string,
    versions: IVersion[]
}
