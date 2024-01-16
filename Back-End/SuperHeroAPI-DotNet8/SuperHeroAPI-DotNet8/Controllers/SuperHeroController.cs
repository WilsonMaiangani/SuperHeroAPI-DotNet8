using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using SuperHeroAPI_DotNet8.Data;
using SuperHeroAPI_DotNet8.Entities;

namespace SuperHeroAPI_DotNet8.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuperHeroController : ControllerBase
    {
        private readonly DataContext _dataContext;

        public SuperHeroController(DataContext dataContext)
        {
            _dataContext = dataContext;
        }

        [HttpGet]
        [Route("/api/superhero/getallsuperheroes")]
        public async Task<ActionResult<List<SuperHero>>> GetAllHeroes()
        {
            var heroes = await _dataContext.SuperHeroes.ToListAsync();
            return Ok(heroes);
        }

        [HttpGet]
        [Route("/api/superhero/getsuperhero/{id}")]
        public async Task<ActionResult<SuperHero>> GetHero(int id)
        {
            var hero = await _dataContext.SuperHeroes.FindAsync(id);
            if (hero is null)
                return NotFound("Heroi not found");

            return Ok(hero);
        }

        [HttpPost]
        [Route("/api/superhero/addsuperhero")]
        public async Task<ActionResult<List<SuperHero>>> AddHero(SuperHero hero)
        {
            _dataContext.SuperHeroes.Add(hero);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.SuperHeroes.ToListAsync());
        }

        [HttpPut]
        [Route("/api/superhero/updatesuperhero")]
        public async Task<ActionResult<List<SuperHero>>> UpdatHero(SuperHero hero)
        {
            var Dbhero = await _dataContext.SuperHeroes.FindAsync(hero.Id);
            if (Dbhero is null)
                return NotFound("Heroi not found");

            Dbhero.Name = hero.Name;
            Dbhero.FirstName = hero.FirstName;
            Dbhero.LastName = hero.LastName;
            Dbhero.Place = hero.Place;

            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.SuperHeroes.ToListAsync());
        }

        [HttpDelete]
        [Route("/api/superhero/deletesuperhero/{id}")]
        public async Task<ActionResult<List<SuperHero>>> DeleteHero(int id)
        {
            var Dbhero = await _dataContext.SuperHeroes.FindAsync(id);
            if (Dbhero is null)
                return NotFound("Heroi not found");

            _dataContext.SuperHeroes.Remove(Dbhero);
            await _dataContext.SaveChangesAsync();

            return Ok(await _dataContext.SuperHeroes.ToListAsync());
        }
    }
}
