const queryParams = {
	reserved_seat_list: encodeURIComponent(JSON.stringify(filtered_seat_list)),
	adult_no,
	child_no,
};

const queryString = Object.entries(queryParams).map([key, value] => `${key}=${value}`).join('&');
