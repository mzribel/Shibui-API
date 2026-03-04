import { StudyLevel } from '@common/enums/study-level.enum';
import { FieldOfStudy } from '@common/enums/field-of-study.enum';
import { UpdateStudentProfileDto, CreateStudentProfileDto } from '@modules/students/dto/student-profile.dto';

export class StudentProfile {
  constructor(
    public readonly userId: number,
    public readonly firstName:string,
    public readonly lastName:string,
    public readonly school: string | null,
    public readonly degreeName: string | null,
    public readonly startYear: number | null,
    public readonly endYear: number | null,
    public readonly currentLevel: StudyLevel | null,
    public readonly targetLevel: StudyLevel | null,
    public readonly pastDegrees: string[],
    public readonly skills: string[],
    public readonly fieldOfStudy: FieldOfStudy | null,
    public readonly cvUrl: string | null,
    public readonly isVisible: boolean,
    public readonly showLastName: boolean,
    public readonly contactPhoneNumber: string | null,
    public readonly contactEmail: string | null,
  ) {}

  static fromObject(data: any): StudentProfile {
    return new StudentProfile(
      data.userId,
      data.firstName,
      data.lastName,
      data.school,
      data.degreeName,
      data.startYear,
      data.endYear,
      data.currentLevel as StudyLevel,
      data.targetLevel as StudyLevel,
      data.pastDegrees,
      data.skills,
      data.fieldOfStudy as FieldOfStudy,
      data.cvUrl,
      data.isVisible,
      data.showLastName,
      data.contactPhoneNumber,
      data.contactEmail
    );
  }

  static fromDto(userId: number, dto: CreateStudentProfileDto): StudentProfile {
    return new StudentProfile(
      userId,
      dto.firstName,
      dto.lastName,
      dto.school ?? null,
      dto.degreeName ?? null,
      dto.startYear ?? null,
      dto.endYear ?? null,
      dto.currentLevel ?? null,
      dto.targetLevel ?? null,
      dto.pastDegrees ?? [],
      dto.skills ?? [],
      dto.fieldOfStudy ?? null,
      dto.cvUrl ?? null,
      true, // isVisible
      true, // showLastName
      dto.contactPhoneNumber ?? null,
      dto.contactEmail ?? null,
    );
  }

  static fromUpdateDto(dto: UpdateStudentProfileDto): Partial<StudentProfile> {
    const update: any = {};
    const fields: (keyof UpdateStudentProfileDto)[] = [
      'firstName', 'lastName', 'school', 'degreeName', 'startYear',
      'endYear', 'currentLevel', 'targetLevel', 'pastDegrees', 'skills',
      'fieldOfStudy', 'cvUrl', 'isVisible', 'showLastName',
      'contactPhoneNumber', 'contactEmail'
    ];

    fields.forEach(field => {
      if (dto[field] !== undefined) {
        update[field] = dto[field];
      }
    });
    return update;
  }
}