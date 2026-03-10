# Users
- added externalUserId (supabase.auth.users.id)
- removed isProfileComplete (should be deduced from data, not defined in DB)
- removed FirstName and LastName (only relevant for a natural person)

# StudentProfiles
- renamed bio to biography
- renamed degree to degreeName (to be coherent with schoolName)
- renamed availabilityDate to availableOn
- removed cvFileName (not present for avatar, should be saved in a correspondance file table)
- replaced lookingForInternship and lookingForApprenticeship by OpenTo ContractType[]
- renamed phone to contactPhone, added contactEmail
- added privacy preferences (isVisibible, showLastName)
- added startYear, currentLevel, targetLevel
- renamed savedJobs to savedOffers and made it an N-to-N relationship table StudentSavedOffers

Added enum StudyLevel

Considerations : 
- Moving socials in another table