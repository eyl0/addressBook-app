import { createServer, Model } from 'miragejs';

export function makeServer({ environment = 'development' } = {}) {
  let server = createServer({
    environment,

    models: {
      contact: Model,
    },

    // seeds(server) {
    //   server.create('contact', { name: 'John ', email: 'john@example.com', phone: '0984298764', address: 'Paranaque City' });
    //   server.create('contact', { name: 'Jane ', email: 'jane@example.com', phone: '0987654321', address: 'Muntinlupa City' });
    // },

    routes() {
      this.namespace = 'api';

      this.post('/contacts', (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.contacts.create(attrs);
      });

      this.get('/contacts', (schema) => {
        return schema.contacts.all();
      });

      this.get('/contacts/:id', (schema, request) => {
        const contactId = request.params.id;
        return schema.contacts.find(contactId);
      });

      this.put('/contacts/:id', (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let contact = schema.contacts.find(id);
        return contact.update(newAttrs);
      });

      this.delete('/contacts/:id', (schema, request) => {
        let id = request.params.id;
        return schema.contacts.find(id).destroy();
      });
    },
  });

  return server;
}