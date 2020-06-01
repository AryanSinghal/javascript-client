import axios from 'axios';
import configuration from '../../configs/configuration';

const callApi = async (method, url, body) => {
  try {
    const { baseUrl } = configuration;
    const { data: { data } } = await axios({
      method: method,
      url: `${baseUrl}/${url}`,
      data: body
    });
    return data;
  }
  catch (err) {
    console.log(err, err.message);
  }
}

export default callApi;
