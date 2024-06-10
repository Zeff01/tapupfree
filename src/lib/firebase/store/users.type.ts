export type Users = {
	id?: string;
	company: string;
	position: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	image: string;
	printStatus: boolean;
	userCode?: string;
	user_link: string;
};

export interface Photo {
	preview: string;
	raw: File;
}
