import { StudyLevel } from '@common/enums/study-level.enum';
import { FieldOfStudy } from '@common/enums/field-of-study.enum';
import { ContractType } from '@common/enums/contract-type.enum';
import {
  StudentProfileDto,
} from '@modules/students/dto/student-profile.dto';

export class StudentProfile {
  constructor(
    public readonly userId: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly biography: string | null,
    public readonly dateOfBirth: Date | null,
    public readonly city: string | null,
    public readonly country: string | null,
    public readonly contactPhone: string | null,
    public readonly contactEmail: string | null,
    public readonly schoolName: string | null,
    public readonly degreeName: string | null,
    public readonly fieldOfStudy: FieldOfStudy | null,
    public readonly startYear: number | null,
    public readonly graduationYear: number | null,
    public readonly currentLevel: StudyLevel | null,
    public readonly targetLevel: StudyLevel | null,
    public readonly skills: string[],
    public readonly languages: string[],
    public readonly cvUrl: string | null,
    public readonly portfolioUrl: string | null,
    public readonly linkedinUrl: string | null,
    public readonly githubUrl: string | null,
    public readonly openTo: ContractType[],
    public readonly preferredLocations: string[],
    public readonly availableOn: Date | null,
    public readonly isVisible: boolean,
    public readonly showLastName: boolean,
  ) {}

  static fromObject(data: any): StudentProfile {
    return new StudentProfile(
      data.userId,
      data.firstName,
      data.lastName,
      data.biography ?? null,
      data.dateOfBirth ? new Date(data.dateOfBirth) : null,
      data.city ?? null,
      data.country ?? null,
      data.contactPhone ?? null,
      data.contactEmail ?? null,
      data.schoolName ?? null,
      data.degreeName ?? null,
      (data.fieldOfStudy as FieldOfStudy) ?? null,
      data.startYear ?? null,
      data.graduationYear ?? null,
      (data.currentLevel as StudyLevel) ?? null,
      (data.targetLevel as StudyLevel) ?? null,
      data.skills ?? [],
      data.languages ?? [],
      data.cvUrl ?? null,
      data.portfolioUrl ?? null,
      data.linkedinUrl ?? null,
      data.githubUrl ?? null,
      data.openTo ?? [],
      data.preferredLocations ?? [],
      data.availableOn ? new Date(data.availableOn) : null,
      data.isVisible,
      data.showLastName,
    );
  }

  static fromDto(userId: number, dto: StudentProfileDto): StudentProfile {
    return new StudentProfile(
      userId,
      dto.firstName,
      dto.lastName,
      dto.biography ?? null,
      dto.dateOfBirth ? new Date(dto.dateOfBirth) : null,
      dto.city ?? null,
      dto.country ?? 'France',
      dto.contactPhone ?? null,
      dto.contactEmail ?? null,
      dto.schoolName ?? null,
      dto.degreeName ?? null,
      dto.fieldOfStudy ?? null,
      dto.startYear ?? null,
      dto.graduationYear ?? null,
      dto.currentLevel ?? null,
      dto.targetLevel ?? null,
      dto.skills ?? [],
      dto.languages ?? [],
      dto.cvUrl ?? null,
      dto.portfolioUrl ?? null,
      dto.linkedinUrl ?? null,
      dto.githubUrl ?? null,
      dto.openTo ?? [],
      dto.preferredLocations ?? [],
      dto.availableOn ? new Date(dto.availableOn) : null,
      dto.isVisible ?? false,
      dto.showLastName ?? false,
    );
  }

  static fromUpdateDto(dto: StudentProfileDto): Partial<StudentProfile> {
    const update: Partial<StudentProfile> = {};

    const fields: (keyof StudentProfileDto)[] = [
      'firstName',
      'lastName',
      'biography',
      'dateOfBirth',
      'city',
      'country',
      'contactPhone',
      'contactEmail',
      'schoolName',
      'degreeName',
      'fieldOfStudy',
      'startYear',
      'graduationYear',
      'currentLevel',
      'targetLevel',
      'skills',
      'languages',
      'cvUrl',
      'portfolioUrl',
      'linkedinUrl',
      'githubUrl',
      'openTo',
      'preferredLocations',
      'availableOn',
      'isVisible',
      'showLastName',
    ];

    fields.forEach((field) => {
      if (dto[field] !== undefined) {
        (update as any)[field] = dto[field];
      }
    });

    return update;
  }
}