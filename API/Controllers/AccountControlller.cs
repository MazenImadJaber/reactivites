using System.Security.Claims;
using API.DTOs;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<AppUser> userManager,
         SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _signInManager = signInManager;
            _tokenService = tokenService;
            _userManager = userManager;
        }
        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await _userManager.FindByEmailAsync(loginDto.Email);
            if (user == null) return Unauthorized();

            var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);
            if (result.Succeeded)
            {
                return createUerDTO(user);
            }
            return Unauthorized();

        }

        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegistorDto registorDto)
        {
            if (await _userManager.Users.AnyAsync(x => x.Email == registorDto.Email))
            {
                return BadRequest("Email Taken ");
            }
            if (await _userManager.Users.AnyAsync(x => x.UserName == registorDto.UserName))
            {
                return BadRequest("username Taken ");
            }
            var user = new AppUser
            {
                DisplayName = registorDto.DisplayName,
                Email = registorDto.Email,
                UserName = registorDto.UserName
            };
            var result = await _userManager.CreateAsync(user, registorDto.Password);

            if (result.Succeeded)
            {
                return createUerDTO(user);
            }
            return Unauthorized("Problem registering user");
        }
        [Authorize]
        [HttpGet]
        public async Task<ActionResult<UserDto>> GetCurrentUser()
        {
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));
            return createUerDTO(user);
        }

        private UserDto createUerDTO(AppUser user)
        {
            return new UserDto
            {
                DisplayNmame = user.DisplayName,
                Image = null,
                Token = _tokenService.CreateToken(user),
                UserName = user.UserName
            };
        }
    }
}