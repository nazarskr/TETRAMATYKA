export interface ProgramItem {
  titleUA: string;
  titleEN: string;
  locationUA: string;
  locationEN: string;
  contentUA: string;
  contentEN: string;
  eventDate: Date;
  eventType: EventType;
  imageUrl: string;
}

export interface EventType {
  nameUA: string;
  nameEN: string;
  color: string;
}
