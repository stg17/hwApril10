using hwApril10.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace hwApril10.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PeopleController : ControllerBase
    {
        private readonly string _connectionString;
        public PeopleController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("ConStr");
        }

        [Route("getpeople")]
        public List<Person> GetPeople()
        {
            var repo = new PeopleRepository(_connectionString);
            return repo.GetAll();
        }

        [HttpPost]
        [Route("addperson")]
        public void AddPerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.AddPerson(person);
        }

        [HttpPost]
        [Route("deleteperson")]
        public void DeletePerson(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.DeletePerson(person);
        }

        [HttpPost]
        [Route("edit")]
        public void Edit(Person person)
        {
            var repo = new PeopleRepository(_connectionString);
            repo.UpdatePerson(person);
        }
    }
}
