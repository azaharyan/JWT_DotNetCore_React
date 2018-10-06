using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using jwt_test.Model;

namespace jwt_test.Controllers
{
    [Produces("application/json")]
    public class RegistrationController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login([FromBody] LoginParameters login)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("dasd2!@_gdpr(qWDpr?)"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                    new Claim(ClaimTypes.Role, "Administrator"),
                };

            var token = new JwtSecurityToken(null,
              null,
              claims,
              expires: DateTime.Now.AddMinutes(30),
              signingCredentials: creds);
            var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
            return new JsonResult(new { token = tokenString });
        }
    }
}