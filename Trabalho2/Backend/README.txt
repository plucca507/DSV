RODE OS COMANDOS ABAIXO PARA CRIAR O PROJETO

dotnet new webapi -minimal -o Backend
cd Backend

>> Substitua o Program

dotnet add package Microsoft.EntityFrameworkCore.Sqlite --version 6.0
dotnet add package Microsoft.EntityFrameworkCore.Design --version 6.0
dotnet tool install --global dotnet-ef

dotnet ef migrations add InitialCreate
dotnet ef database update

dotnet run