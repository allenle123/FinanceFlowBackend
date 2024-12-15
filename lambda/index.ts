export const handler = async (event: any) => {
  try {
    console.log('Event:', JSON.stringify(event, null, 2));

    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Hello from Finance Flow API!',
            timestamp: new Date().toISOString()
          })
        };

      case 'POST':
        const body = JSON.parse(event.body || '{}');
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Data received',
            data: body
          })
        };

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({
            message: 'Unsupported method'
          })
        };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error'
      })
    };
  }
}; 