using System.Linq;
using AutoMapper;
using DatingApp1.API.DTOS;
using DatingApp1.API.Models;

namespace DatingApp1.API.Helper
{
    public class AutoMapperprofiles: Profile
    {
        public AutoMapperprofiles() {

             CreateMap<User,UserForListDto>()
             .ForMember(dest => dest.PhotoUrl, opt => {
                 opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
             })
             .ForMember( dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateofBirth.Calculateage());
             });
        CreateMap<User,UserForDetaildto>() .ForMember(dest => dest.PhotoUrl, opt => {
                 opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
             })
             .ForMember( dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateofBirth.Calculateage());
             });
         CreateMap<Photo,PhotosForDetailedDto>();
         CreateMap<UserUpdatedto,User>();
         CreateMap<PhotoForCreationDto, Photo>();
         CreateMap<Photo,PhotoForRetuenDto>();
        
        }
       
    }
}