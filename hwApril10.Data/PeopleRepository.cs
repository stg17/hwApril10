using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace hwApril10.Data
{
    public class PeopleRepository
    {
        private readonly string _connectionString;
        public PeopleRepository(string connectionString)
        {
            _connectionString = connectionString;
        }

        public List<Person> GetAll()
        {
            var context = new PeopleDataContext(_connectionString);
            return context.People.ToList();
        }

        public void AddPerson(Person person)
        {
            var context = new PeopleDataContext(_connectionString);
            context.People.Add(person);
            context.SaveChanges();
        }

        public void DeletePerson(Person person)
        {
            var context = new PeopleDataContext(_connectionString);
            context.People.Remove(person);
            context.SaveChanges();
        }

        public void UpdatePerson(Person person)
        {
            var context = new PeopleDataContext(_connectionString);
            context.People.Update(person);
            context.SaveChanges();
        }
    }
}
