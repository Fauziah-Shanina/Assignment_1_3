using NTC_Assignment_1.Models;
using System.Collections.Generic;
using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace NTC_Assignment_1.Controllers
{
    [Route("api/[controller]")]
    public class PostController : Controller
    {
        private readonly HttpClient _client = new HttpClient();
        private const string ApiUrl = "https://jsonplaceholder.typicode.com";

        [HttpGet("posts")]
        public async Task<ICollection<Post>> GetAllPostsAsync()
        {
            var getAllUrl = ApiUrl + "/posts";
            var postList = new List<Post>();
            var response = await _client.GetAsync(getAllUrl);
            if (response.IsSuccessStatusCode)
            {
                postList = await response.Content.ReadAsAsync<List<Post>>();
            }
            return postList;
        }

        [HttpGet("post/{postId}/comments")]
        public async Task<ICollection<Comment>> GetCommentsAsync(int postId)
        {
            var getCommentsUrl = ApiUrl + "/posts/" + postId + "/comments";
            var commentList = new List<Comment>();
            var response = await _client.GetAsync(getCommentsUrl);
            if (response.IsSuccessStatusCode)
            {
                commentList = await response.Content.ReadAsAsync<List<Comment>>();
            }
            return commentList;
        }

        [HttpDelete("post/{postId}")]
        public async Task<IActionResult> DeletePostAsync(int postId)
        {
            var deleteUrl = ApiUrl + "/posts/" + postId;
            var response = await _client.DeleteAsync(deleteUrl);
            if (response.IsSuccessStatusCode)
            {
                return new OkObjectResult(response);
            }
            return new BadRequestObjectResult(new { Message = "Bad request" });
        }

        [HttpPost("post")]
        public async Task<IActionResult> AddPostAsync([FromBody]Post post)
        {
            var addUrl = ApiUrl + "/posts";
            var response = await _client.PostAsJsonAsync(addUrl, post);
            if (response.IsSuccessStatusCode)
            {
                var resultString = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<Post>(resultString);
                return new OkObjectResult(result);
            }
            return new BadRequestObjectResult(new { Message = "Bad request" });
        }
    }


}
