

export default async function handler(req, res) {
    const { method } = req;
    const { id } = req.query;
    const { name, email, password } = req.body;

    switch (method) {
        case 'GET':
            if (id) {
                // Handle GET request with id
            } else {
                // Handle GET request without id
            }
            break;
    }
}