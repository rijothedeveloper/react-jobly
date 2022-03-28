import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** get list of companies */

  static async getCompanies(filter) {
    let res;
    if(filter==="")
      res = await this.request(`companies`);
    else
      res = await this.request(`companies`,{name:filter});
    return res.companies
  }

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    const res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get alljobs  */

  static async getJobs(filter) {
    let res;
    if(filter==="")
      res = await this.request('jobs');
    else
      res = await this.request('jobs', {title: filter})
      return res.jobs
  }

  /** Get a purticular job using job id */
  
  static async getJob(id) {
    const res = await this.request(`jobs/${id}`)
    return res.job;
  }

  static async registerUser(newUser) {
    try{
      const res = await this.request('auth/register', newUser, 'post')
      JoblyApi.token=res;
      return res.token;
    } catch(error) {
      console.log(`api call error ${error}`);
      return null;
    }

  }

    static async login(user) {
      try{
        const res = await this.request('auth/token', user, 'post')
        JoblyApi.token=res.token;
        return res.token;
      } catch(error) {
        console.log(`api call error ${error}`);
        return null;
      }
    
  }

  static async getUser(username) {
    try{
      const res = await this.request(`users/${username}`, {username: username})
      return res.user;
    } catch(error) {
        console.log(`api call error ${error}`);
        return null;
    }
  }

  static async editUser(username, user) {
    try{
      const res = await this.request(`users/${username}`, user, "patch")
      return res.user;
    } catch (error) {
      console.log(`api call error ${error}`);
      return null;
    }
  }

  static async applyJob(username, jobId) {
    try{
      const res = await this.request(`users/${username}/jobs/${jobId}`, {}, "post")
      return res.applied;
    } catch (error) {
      console.log(`api call error ${error}`);
      return null;
    }
  }
  

  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
// JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
//     "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
//     "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";

    JoblyApi.token = localStorage.getItem("token");

    export default JoblyApi;