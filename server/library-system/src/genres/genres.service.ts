import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenreDto } from 'src/common/dto/genres/create-genre-dto.dto';
import { UpdateGenreDto } from 'src/common/dto/genres/update-genre-dto.dto';
import { Genre } from 'src/common/schemas';

@Injectable()
export class GenresService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}

  async getAll() {
    return this.genreModel.find().exec();
  }

  async getOneByCode(code: string) {
    return this.genreModel.findOne({ code }).exec();
  }

  async create(createGenreDto: CreateGenreDto) {
    const createdGenre = new this.genreModel(createGenreDto);
    return createdGenre.save();
  }

  async update(code: string, updateGenreDto: UpdateGenreDto) {
    return this.genreModel
      .findOneAndUpdate({ code }, updateGenreDto, { new: true })
      .exec();
  }

  async delete(code: string) {
    return this.genreModel.findOneAndDelete({ code }).exec();
  }
}
