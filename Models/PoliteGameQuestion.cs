using System;
using System.ComponentModel.DataAnnotations;

namespace dotnet_react.Models
{
    public class PoliteGameQuestion
    {
        [Key]
        public int Id { get; set; }
        public string Question { get; set; }
        public bool IsPolite { get; set; }
    }
}
