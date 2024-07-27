import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGenreDto } from 'src/common/dto/genres/create-genre-dto.dto';
import { UpdateGenreDto } from 'src/common/dto/genres/update-genre-dto.dto';
import { BookGenre, Genre } from 'src/common/schemas';

@Injectable()
export class GenresService {
  constructor(
    @InjectModel(Genre.name) private genreModel: Model<Genre>,
    @InjectModel(BookGenre.name) private bookGenreModel: Model<BookGenre>,
  ) {}

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

  async getGenresByIds(ids: string[]): Promise<Genre[]> {
    return this.genreModel.find({ _id: { $in: ids } }).exec();
  }

  async getGenreCodesByBookId(bookId: string): Promise<string[]> {
    const bookGenres = await this.bookGenreModel.find({ book: bookId }).exec();
    const genreIds = bookGenres.map((bg) => bg.genre);
    const genres = await this.genreModel
      .find({ _id: { $in: genreIds } })
      .exec();
    return genres.map((genre) => genre.code);
  }
}
