export interface BaseStructure{
  type: string;
  style?: string;
  bind?: string;
  children?: BaseStructure[];
}

export interface UrlStructure extends BaseStructure{
    textbind: string;
}

export interface MapStructure extends BaseStructure{
    type: "map";
    source: string;
    bind: string; 
    template: BaseStructure;  
}

export type ResumeStructure = BaseStructure | UrlStructure | MapStructure;