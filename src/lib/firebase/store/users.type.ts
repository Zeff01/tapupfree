export type Users = {
	company: string;
	position: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	image: string;
	printStatus: boolean;
};

export interface Photo {
	preview: string;
	raw: File;
}
