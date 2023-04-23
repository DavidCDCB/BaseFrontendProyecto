export interface IServiceRequest {
	starDate:    string;
	endDate:     string;
	state:       string;
	name:        string;
	price:       number;
	description: string;
	category:    string;
}

export interface IRequest {
	id?:       number;
	starDate:  string;
	endDate:   string;
	state:     string;
	clientId:  number;
	serviceId: number;
}

export interface IService {
	id?:         number;
	name:        string;
	price:       number;
	description: string;
	category:    string;
}

