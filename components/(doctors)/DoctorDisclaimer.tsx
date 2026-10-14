"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

interface DoctorProfileClientProps {
  doctor: any;
}

export default function DoctorProfileClient({
  doctor,
}: DoctorProfileClientProps) {
  const router = useRouter();

  if (!doctor) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--background)] text-[var(--foreground)] px-4">
        <h1 className="text-2xl font-bold mb-2">Doctor Not Found</h1>
        <p className="text-[var(--color-text-muted)] mb-4 text-center">
          The doctor profile you are looking for does not exist.
        </p>
        <Link
          href="/#doctors-section"
          className="text-[var(--color-accent-red)] hover:underline font-medium"
        >
          &larr; Back to View All Doctors
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background)] py-12 px-4 sm:px-6 lg:px-8 text-[var(--foreground)]">
      <div className="max-w-7xl mx-auto bg-[var(--surface)] rounded-2xl shadow-xl overflow-hidden border border-slate-100">

        {/* Top Header Card */}
        <div className="md:flex bg-[var(--color-primary-dark)] text-white p-8 items-center gap-8">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-40 h-40 rounded-full object-cover border-4 border-white/20 shadow-md mx-auto md:mx-0 mb-6 md:mb-0"
          />
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-extrabold">{doctor.name}</h1>
            <p className="text-blue-200 text-lg mt-1">{doctor.specialty}</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg text-sm font-medium">
              <span>⏱️ {doctor.Experience || "Professional"} Experience</span>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8">

          {/* Main Info Columns */}
          <div className="md:col-span-2 space-y-8">

            {/* About Section */}
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-3">
                About {doctor.name}
              </h2>
              <p className="text-[var(--color-text-muted)] leading-relaxed">
                {doctor.about ||
                  "Profile details are being updated. Please contact the hospital for more information about this consultant."}
              </p>
            </div>

            {/* Qualifications & Experience */}
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-3">
                Qualifications & Experience
              </h2>
              <div className="bg-[var(--background)] rounded-xl p-5 border border-slate-200 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase">
                    Qualifications
                  </h4>
                  <p className="text-[var(--color-text-dark)] font-medium">
                    {doctor.Qualification || "MBBS, MD"}
                  </p>
                </div>
                <hr className="border-slate-200" />
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase">
                    Experience
                  </h4>
                  <p className="text-[var(--color-text-dark)] font-medium">
                    {doctor.Experience || "Professional experience"} of clinical practice
                  </p>
                </div>
                <hr className="border-slate-200" />
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase">
                    Specialization
                  </h4>
                  <p className="text-[var(--color-text-dark)] font-medium">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-3">
                Contact Information
              </h2>
              <div className="bg-[var(--background)] rounded-xl p-5 border border-slate-200 space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase">
                    Email
                  </h4>
                  <p className="text-[var(--color-text-dark)] font-medium">
                    {doctor.email || "contact@sakshamhospital.com"}
                  </p>
                </div>
                <hr className="border-slate-200" />
                <div>
                  <h4 className="text-sm font-semibold text-[var(--color-text-muted)] uppercase">
                    Location
                  </h4>
                  <p className="text-[var(--color-text-dark)] font-medium">
                    {doctor.location ||
                      "Saharanpur Charitable Hospital, Near Officer's Colony, Delhi Road, Saharanpur, UP - 247001"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Booking Card */}
          <div className="space-y-6">
            <div className="bg-[var(--color-medical-blue)]/50 border border-blue-100 rounded-2xl p-6 shadow-sm">
              <div className="text-center mb-4">
                <span className="text-xs font-bold text-[var(--color-medical-line)] uppercase tracking-wider">
                  Consultation Fee
                </span>
                <div className="text-3xl font-extrabold text-[var(--color-text-dark)] mt-1">
                  {doctor.consultationFee || "₹500"}
                </div>
              </div>

              <div className="border-t border-blue-200 pt-4 mb-6">
                <h4 className="text-sm font-bold text-[var(--color-text-dark)] mb-2">
                  OPD Timings
                </h4>
                {doctor.opdTimings?.morning && (
                  <div className="text-xs text-[var(--color-text-muted)] mb-1">
                    <span className="font-semibold text-[var(--color-text-dark)]">
                      Morning:
                    </span>{" "}
                    {doctor.opdTimings.morning}
                  </div>
                )}
                {doctor.opdTimings?.evening && (
                  <div className="text-xs text-[var(--color-text-muted)]">
                    <span className="font-semibold text-[var(--color-text-dark)]">
                      Evening:
                    </span>{" "}
                    {doctor.opdTimings.evening}
                  </div>
                )}
                {!doctor.opdTimings?.morning &&
                  !doctor.opdTimings?.evening && (
                    <div className="text-xs text-[var(--color-text-muted)]">
                      Available as per hospital schedule.
                    </div>
                  )}
              </div>

              <button
                onClick={() => router.push("/#Book_appointment")}
                className="w-full bg-[var(--color-accent-red)] hover:bg-rose-700 text-white font-semibold py-3 px-4 rounded-xl shadow transition duration-200 mb-3 text-center block cursor-pointer"
              >
                Book Appointment
              </button>
            </div>

            <div className="text-center">
              <Link
                href="/#doctors-section"
                className="inline-block text-sm font-medium text-[var(--color-accent-red)] hover:underline"
              >
                &larr; View All Doctors
              </Link>
            </div>
          </div>
        </div>

        {/* Footer disclaimer */}
        <div className="bg-[var(--background)] p-6 text-xs text-[var(--color-text-muted)] border-t border-slate-200 text-center space-y-1">
          <p>
            Medical information on this page is for general awareness and does
            not replace a clinical consultation. Treatment decisions should be
            made with a qualified doctor at Saksham Hospital.
          </p>
          <p>
            For emergencies, call{" "}
            <strong className="text-[var(--color-text-dark)]">
              +91 98370 45239
            </strong>{" "}
            or use hospital emergency services.
          </p>
        </div>
      </div>
    </div>
  );
}