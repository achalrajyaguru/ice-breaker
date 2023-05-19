import Nav from "../components/Nav";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OnBoarding = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [formData, setFormData] = useState({
    user_id: cookies.UserId,
    email: "",
    password: "",
    first_name: "",
    major: "",
    dob_dob: "",
    // dob_day: "",
    // dob_month: "",
    // dob_year: "",
    show_gender: false,
    gender_identity: "man",
    gender_interest: "woman",
    building_b: "b1",
    time: 0,
    url: "",
    about: "",
    matches: [],
  });

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log("submitted");
    e.preventDefault();
    try {
      var json = JSON.stringify(formData);
      const response = await axios.post("http://localhost:8000/signup", {
        json,
      });
      setCookie("AuthToken", response.data.token);
      setCookie("UserId", response.data.userId);
      const success = response.status === 200 || response.status === 201;
      if (success) navigate("/dashboard");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    console.log("e", e);
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      {<Nav minimal={true} setShowModal={() => {}} showModal={false} />}

      <div className="onboarding">
        <h2>CREATE ACCOUNT</h2>
        <h4>You cannot change these details later!</h4>

        <form onSubmit={handleSubmit}>
          <section>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              required={true}
              onChange={handleChange}
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              required={true}
              onChange={handleChange}
            />
            <label htmlFor="first_name">First Name</label>
            <input
              id="first_name"
              type="text"
              name="first_name"
              placeholder="First Name"
              required={true}
              value={formData.first_name}
              onChange={handleChange}
            />
            <label htmlFor="major">Major</label>
            <input
              id="major"
              type="text"
              name="major"
              placeholder="Enter the degree that you are pursuing"
              required={true}
              value={formData.major}
              onChange={handleChange}
            />
            <label htmlFor="hobbies">Hobbies</label>
            <input
              id="hobbies"
              type="text"
              name="hobbies"
              placeholder="Dancing, Music, Art!"
              required={true}
              value={formData.hoobies}
              onChange={handleChange}
            />

            <label>Birthday</label>
            <div className="multiple-input-container">
              <input
                id="dob_dob"
                type="date"
                name="dob_dob"
                placeholder="MM/DD/YYYY"
                required={true}
                value={formData.dob_dob}
                onChange={handleChange}
              />

              {/* <input
                                id="dob_day"
                                type="number"
                                name="dob_day"
                                placeholder="DD"
                                required={true}
                                value={formData.dob_day}
                                onChange={handleChange}
                            />

                            <input
                                id="dob_year"
                                type="number"
                                name="dob_year"
                                placeholder="YYYY"
                                required={true}
                                value={formData.dob_year}
                                onChange={handleChange}
                            /> */}
            </div>

            <label>Gender</label>
            <div className="multiple-input-container">
              <input
                id="man-gender-identity"
                type="radio"
                name="gender_identity"
                value="man"
                onChange={handleChange}
                checked={formData.gender_identity === "man"}
              />
              <label htmlFor="man-gender-identity">Man</label>
              <input
                id="woman-gender-identity"
                type="radio"
                name="gender_identity"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_identity === "woman"}
              />
              <label htmlFor="woman-gender-identity">Woman</label>
              <input
                id="more-gender-identity"
                type="radio"
                name="gender_identity"
                value="more"
                onChange={handleChange}
                checked={formData.gender_identity === "more"}
              />
              <label htmlFor="more-gender-identity">More</label>
            </div>

            <label>Where do you study</label>
            <div className="multiple-input-container">
              <input
                id="b1identity"
                type="radio"
                name="building_b"
                value="b1"
                onChange={handleChange}
                checked={formData.building_b === "b1"}
              />
              <label htmlFor="b1identity">Engineering building</label>
              <input
                id="b2identity"
                type="radio"
                name="building_b"
                value="b2"
                onChange={handleChange}
                checked={formData.building_b === "b2"}
              />
              <label htmlFor="b2identity">Science building</label>
            </div>

            <label htmlFor="time">When will you be on campus</label>
            <input
              id="time"
              type="text"
              name="time"
              placeholder="for e.g 9"
              required={true}
              value={formData.time}
              onChange={handleChange}
            />

            <label htmlFor="show-gender">
              Show Gender on my Profile{" "}
              <input
                id="show-gender"
                type="checkbox"
                name="show_gender"
                onChange={handleChange}
                checked={formData.show_gender}
              />
            </label>

            <label>Show Me</label>

            <div className="multiple-input-container">
              <input
                id="man-gender-interest"
                type="radio"
                name="gender_interest"
                value="man"
                onChange={handleChange}
                checked={formData.gender_interest === "man"}
              />
              <label htmlFor="man-gender-interest">Man</label>
              <input
                id="woman-gender-interest"
                type="radio"
                name="gender_interest"
                value="woman"
                onChange={handleChange}
                checked={formData.gender_interest === "woman"}
              />
              <label htmlFor="woman-gender-interest">Woman</label>
              <input
                id="everyone-gender-interest"
                type="radio"
                name="gender_interest"
                value="everyone"
                onChange={handleChange}
                checked={formData.gender_interest === "everyone"}
              />
              <label htmlFor="everyone-gender-interest">Everyone</label>
            </div>

            <label htmlFor="about">About me</label>
            <input
              id="about"
              type="text"
              name="about"
              required={true}
              placeholder="I like long walks..."
              value={formData.about}
              onChange={handleChange}
            />

            <input type="submit" />
          </section>

          <section>
            <label htmlFor="url">Profile Photo</label>
            <input
              type="url"
              name="url"
              id="url"
              onChange={handleChange}
              required={true}
            />
            <div className="photo-container">
              {formData.url && (
                <img src={formData.url} alt="profile pic preview" />
              )}
            </div>
          </section>
        </form>
      </div>
    </>
  );
};
export default OnBoarding;