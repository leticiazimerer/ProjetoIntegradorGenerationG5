﻿using IntegratorProject.src.data;
using IntegratorProject.src.dtos;
using IntegratorProject.src.models;
using System.Collections.Generic;
using System.Linq;

namespace IntegratorProject.src.repositories.implements
{
    /// <summary>
    /// <para>Implementing User Interface at UserRepository.</para>
    /// <para>By: João Vitor, Julio Conceição, José Vinicius</para>
    /// <para>v 1.0</para>
    /// <para>05.05.2022</para>
    /// </summary>
    public class UserRepository : IUser
    {
        #region attributes
        private readonly IntegratorProjectContext _context;
        #endregion attributes

        #region constructors
        public UserRepository(IntegratorProjectContext context)
        {
            _context = context;
        }
        #endregion constructors

        #region methods
        public void AddNewUser(NewUserDTO user)
        {
            _context.Users.Add(new UserModel
            {
                Name = user.Name,
                CPF_CNPJ = user.CPF_CNPJ,
                Email = user.Email,
                Adress = user.Adress,
                NameAgent = user.NameAgent,
            });
            _context.SaveChanges();
        }

        public void DeleteUser(int id)
        {
            _context.Users.Remove(GetUserById(id));
            _context.SaveChanges();
        }

        public UserModel GetUserById(int id)
        {
            return _context.Users
                .FirstOrDefault(u => u.Id == id);
        }

        public void UpDateUser(UpDateUserDTO user)
        {
            var userModel = GetUserById(user.Id);
            userModel.Name = user.Name;
            userModel.Password = user.Password;
            userModel.Adress = user.Adress;
            userModel.NameAgent = user.NameAgent;
            _context.Users.Update(userModel);
            _context.SaveChanges();
        }

        public List<UserModel> GetUserByAdress(string adress)
        {
            return _context.Users
                .Where(u => u.Adress.Contains(adress))
                .ToList();
        }

        public List<UserModel> GetAllOngs()
        {
            return _context.Users
                .Where(u => u.Type == UserType.Ong)
                .ToList();
        }
        #endregion methods
    }
}
