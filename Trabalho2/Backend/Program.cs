using Microsoft.EntityFrameworkCore;

using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Trabalho
{
	class Usuario
    {
    	public int id { get; set; }
		public string? nome { get; set; }
    	public string? email { get; set; }
    }

	class Filme
    {
    	public int id { get; set; }
		public string? titulo { get; set; }
    	public string? categoria { get; set; }
    }

	class Locacao
    {
    	public int id { get; set; }
		public string? emailUsuario { get; set; }
    	public string? tituloFilme { get; set; }
		public DateTime? dataLocacao { get; set; }
		public DateTime? dataDevolucao { get; set; }
		// public bool? locado { get; set; }
    }
	
	class BaseLocadora : DbContext
	{
		public BaseLocadora(DbContextOptions options) : base(options)
		{
		}
		
		public DbSet<Usuario> Usuarios { get; set; } = null!;
		public DbSet<Filme> Filmes { get; set; } = null!;
		public DbSet<Locacao> Locacoes { get; set; } = null!;
	}
	
	class Program
	{
		static void Main(string[] args)
		{
			var builder = WebApplication.CreateBuilder(args);
			
			var connectionString = builder.Configuration.GetConnectionString("BaseLocadora") ?? "Data Source=BaseLocadora.db";
			builder.Services.AddSqlite<BaseLocadora>(connectionString);

			builder.Services.AddCors(options => options.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
			
			var app = builder.Build();

			app.UseCors();


			/////////////////
			//CRUD DO USUARIO
			/////////////////

			//lista usuarios
			app.MapGet("/usuarios", (BaseLocadora baseUsuarios) =>
			{
				return baseUsuarios.Usuarios.ToList();
			});
			
			//cria usuario
			app.MapPost("/usuarios", (BaseLocadora baseUsuarios, Usuario usuario) =>
			{
				//valida email (que precisa ser unico)
				if(baseUsuarios.Usuarios.Where(u => u.email == usuario.email).Count() > 0)
				{
					return Results.Problem("email indisponivel");
				}
				baseUsuarios.Usuarios.Add(usuario);
				baseUsuarios.SaveChanges();
				return Results.Ok();
			});

			// atualiza usuario
			app.MapPut("/usuarios/{id}", (BaseLocadora baseUsuarios, Usuario atualizado, int id) =>
			{
				var usuario = baseUsuarios.Usuarios.Find(id);
				if(usuario == null)
				{
					return Results.NotFound();
				}
				if(null != atualizado.email)       usuario.email       = atualizado.email;
				if(null != atualizado.nome)        usuario.nome        = atualizado.nome;
				baseUsuarios.SaveChanges();
				return Results.Ok();
			});

			//deleta usuario
			app.MapDelete("/usuarios/{id}", (BaseLocadora baseUsuarios, int id) =>
			{
				var usuario = baseUsuarios.Usuarios.Find(id);
				if(usuario == null)
				{
					return Results.NotFound();
				}
				baseUsuarios.Remove(usuario);
				baseUsuarios.SaveChanges();
				return Results.Ok();
			});

			
			/////////////////
			//CRUD DOS FILMES
			/////////////////

			//lista filmes
			app.MapGet("/filmes", (BaseLocadora baseFilmes) =>
			{
				return baseFilmes.Filmes.ToList();
			});
			
			//cria filmes
			app.MapPost("/filmes", (BaseLocadora baseFilmes, Filme Filme) =>
			{
				//valida título (que precisa ser unico)
				if(baseFilmes.Filmes.Where(u => u.titulo == Filme.titulo).Count() > 0)
				{
					return Results.Problem("Título já registrado");
				}
				baseFilmes.Filmes.Add(Filme);
				baseFilmes.SaveChanges();
				return Results.Ok();
			});
			
			// atualiza filme
			app.MapPut("/filmes/{id}", (BaseLocadora baseFilmes, Filme atualizado, int id) =>
			{
				var Filme = baseFilmes.Filmes.Find(id);
				if(Filme == null)
				{
					return Results.NotFound();
				}
				if(null != atualizado.categoria)       Filme.categoria       	= atualizado.categoria;
				if(null != atualizado.titulo)        Filme.titulo        		= atualizado.titulo;
				baseFilmes.SaveChanges();
				return Results.Ok();
			});

			//deleta filme
			app.MapDelete("/filmes/{id}", (BaseLocadora baseFilmes, int id) =>
			{
				var Filme = baseFilmes.Filmes.Find(id);
				if(Filme == null)
				{
					return Results.NotFound();
				}
				baseFilmes.Remove(Filme);
				baseFilmes.SaveChanges();
				return Results.Ok();
			});



			/////////////////
			//CRUD DAS LOCAÇÕES
			/////////////////

			//lista locações
			app.MapGet("/locacoes", (BaseLocadora baseLocacoes) =>
			{
				return baseLocacoes.Locacoes.ToList();
			});
			
			//cria locações
			app.MapPost("/locacoes", (BaseLocadora baseLocacoes, Locacao locacao) =>
			{
				if(baseLocacoes.Locacoes.Where(u => u.tituloFilme == locacao.tituloFilme).Count() > 0)
				{
					return Results.Problem("Título já registrado");
				}
				baseLocacoes.Locacoes.Add(locacao);
				baseLocacoes.SaveChanges();
				return Results.Ok();
			});

			// atualiza locacações
			app.MapPut("/locacoes/{id}", (BaseLocadora baseLocacoes, Locacao atualizado, int id) =>
			{
				var Locacao = baseLocacoes.Locacoes.Find(id);
				if(Locacao == null)
				{
					return Results.NotFound();
				}
				if(null != atualizado.emailUsuario)       Locacao.emailUsuario       	= atualizado.emailUsuario;
				if(null != atualizado.tituloFilme)        Locacao.tituloFilme        		= atualizado.tituloFilme;
				if(null != atualizado.dataLocacao)        Locacao.dataLocacao        		= atualizado.dataLocacao;
				if(null != atualizado.dataDevolucao)        Locacao.dataDevolucao        		= atualizado.dataDevolucao;
				// if(null != atualizado.locado)        Locacao.locado        		= atualizado.locado;
				baseLocacoes.SaveChanges();
				return Results.Ok();
			});

			//deleta locacão
			app.MapDelete("/locacoes/{id}", (BaseLocadora baseLocacoes, int id) =>
			{
				var Locacao = baseLocacoes.Locacoes.Find(id);
				if(Locacao == null)
				{
					return Results.NotFound();
				}
				baseLocacoes.Remove(Locacao);
				baseLocacoes.SaveChanges();
				return Results.Ok();
			});


			///////////////////////
			//EXECUCAO DA APLICACAO
			///////////////////////
			app.Run("http://localhost:3000");
		}
	}
}