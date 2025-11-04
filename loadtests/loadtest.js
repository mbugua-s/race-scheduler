/* eslint-disable */
import http from 'k6/http';
import { sleep, check } from 'k6';

export const options = {
	vus: 5000, // number of virtual users
	duration: '60s', // test duration
};

const BASE_URL = 'http://host.docker.internal:3000';
const ENDPOINT = `${BASE_URL}/tracks`; // replace with your GET endpoint

export default function () {
	const res = http.get(ENDPOINT);

	check(res, {
		'status is 200': (r) => r.status === 200,
	});

	sleep(1);
}
