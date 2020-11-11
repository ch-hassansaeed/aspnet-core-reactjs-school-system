using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace aspnet_reactjs_basic.Model
{
    public class Student
    {
        [Key]
        [Required]
        public int Id { get; set; } = 0;

        [MaxLength(50)]
        public string Name { get; set; } = "";

        public int Roll { get; set; } = 0;
    }
}
