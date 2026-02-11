export type TagType = 'skill' | 'grade' | 'certificate';

export interface CvTagData {
  label: string;
  type: TagType;
}

export interface CvSubsectionData {
  id: string;
  title: string;
  subtitle: string;
  timeframe: string;
  description: string;
  bullets: string[];
  tags: CvTagData[];
}

export interface CvSectionData {
  id: string;
  title: string;
  subsections: CvSubsectionData[];
}