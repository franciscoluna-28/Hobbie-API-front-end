export interface IActivity {
  activityName: string;
  type: ActivityType | string;
  participants: number;
  price: number;
  accessibility: number;
  description: string;
  activityId: string;
  ratingMean: number;
  totalReviews: number;
  urls: {
    full: string;
    regular: string;
    small: string;
  };
  links: Array<LinkObject>;
  user: {
    name: string;
    username: string;
    links: {
      html: string;
    };
    profile_image: {
      medium: string;
    };
  };
}

type LinkObject = object;

export enum ActivityType {
  Education = "education",
  Recreational = "recreational",
  Social = "social",
  DIY = "diy",
  Charity = "charity",
  Cooking = "cooking",
  Relaxation = "relaxation",
  Music = "music",
  Busywork = "busywork",
}
