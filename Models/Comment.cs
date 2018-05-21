using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NTC_Assignment_1.Models
{
    public class Comment
    {
        public int postId { set; get; }
        public int id { set; get; }
        public string name { set; get; }
        public string email { set; get; }
        public string body { set; get; }
    }
}
